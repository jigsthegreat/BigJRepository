angular.module('BigJApp').controller('PayrollController', function ($scope, $state, Attendance, Employee, User, branchId) {
    $scope.attendances = Attendance.query();
    $scope.employees = Employee.query();
    $scope.now = new Date();
    $scope.startDate = null;
    $scope.pickDate = null;
    $scope.payrolls = {};
    $scope.displayedCollection = [].concat($scope.employees);

    $scope.format = 'dd-MMM-yyyy';
    $scope.maximumDate = new Date();
    $scope.calendar = {};

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.calendar.opened = true;
    };

    $scope.$watch("pickDate", function () {
        if ($scope.pickDate != null) {
            var date = new Date($scope.pickDate);
            if (date.getDay() != 0) {
                while (date.getDay() != 0) {
                    date.setDate(date.getDate() - 1);
                }
            }
            date.setDate(date.getDate() + 1);
            $scope.startDate = date;
        }
    });

    $scope.getStatus = function (employee, date) {
        var date = new Date(date);
        date.setHours(0, 0, 0, 0);
        var i;
        for (i = 0; i < employee.attendances.length; i++) {
            var date2 = new Date(employee.attendances[i].date);
            date2.setHours(0, 0, 0, 0);
            if (date2.valueOf() == date.valueOf()) {
                var attendance = employee.attendances[i];
                if (attendance.isPresent) {
                    if (attendance.isWholeDay) {
                        return '\u2713';
                    }
                    return "H";
                }
            }
        }
        return "X";
    };

    $scope.addToSalary = function (employee, attendance) {
        var multiplier = 0;
        if (attendance == '\u2713') {
            multiplier = 1;
        } else if (attendance == "H") {
            multiplier = 0.5;
        }
        return $scope.payrolls[employee.id].salary + (employee.salaryRate * multiplier);
    };

    $scope.numberOfDays = [0, 1, 2, 3, 4, 5];

    $scope.getResultDay = function (date, num) {
        var date = new Date(date);
        date.setDate(date.getDate() + num);
        return date;
    };

    $scope.getSalary = function (employee, start, end) {
        var start = new Date(start);
        var end = new Date(end);
        var salary = 0;
        var multiplier, day, attendance, i;

        for (i = 0; i < employee.attendances.length; i++) {//finding the attendances between the dates
            attendance = employee.attendances[i];
            day = new Date(attendance.date);
            if ($scope.findIfDayInRange(day, start, end)) {
                multiplier = 0;
                if (attendance.isPresent && !attendance.isPaymentReceived) {//adding the salary by identifying if the employee is present and wholeDay
                    if (attendance.isWholeDay) {
                        multiplier = 1;
                    } else {
                        multiplier = 0.5;
                    }
                }
                salary += employee.salaryRate * multiplier;
            }
        }
        return salary;
    };

    $scope.findIfDayInRange = function (attendance, start, end) {
        var start = new Date(start);
        var end = new Date(end);
        var day = new Date(attendance);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        day.setHours(0, 0, 0, 0);
        if (start.valueOf() <= day.valueOf() && end.valueOf() >= day.valueOf()) {
            return true;
        } else {
            return false;
        }
    };

    $scope.payOneDaySalary = function (attendanceId) {
        var attendance = Attendance.get({attendance: attendanceId});
        attendance.isPaymentReceived = true;
        Attendance.update({attendance: attendanceId}, attendance, function () {
            setTimeout(function () {
                $scope.employees = Employee.query();
            }, 1000);
        });
    };

    $scope.restoreBalanceForOneDay = function (attendanceId) {
        var attendance = Attendance.get({attendance: attendanceId});
        attendance.isPaymentReceived = false;
        Attendance.update({attendance: attendanceId}, attendance, function () {
            setTimeout(function () {
                $scope.employees = Employee.query();
            }, 1000);
        });
    };

    $scope.payWeeklySalary = function (employee, start, end) {
        var i, attendance;
        for (i = 0; i < employee.attendances.length; i++) {
            attendance = employee.attendances[i];
            if ($scope.findIfDayInRange(attendance.date, start, end) && !attendance.isPaymentReceived) {
                $scope.payOneDaySalary(attendance.id);
            }
        }
    };
    $scope.restoreWeeklyBalance = function (employee, start, end) {
        var i, attendance;
        for (i = 0; i < employee.attendances.length; i++) {
            attendance = employee.attendances[i];
            if ($scope.findIfDayInRange(attendance.date, start, end) && attendance.isPaymentReceived) {
                $scope.restoreBalanceForOneDay(attendance.id);
            }
        }
    };

    $scope.havePresentAttendance = function (employee, date) {
        var date = new Date(date);
        var status = false;
        var i;
        for (i = 0; i < $scope.numberOfDays.length; i++) {
            var attendance = $scope.getStatus(employee, $scope.getResultDay(date, $scope.numberOfDays[i]));
            if (attendance == '\u2713' || attendance == "H") {
                status = true;
            }
        }
        return status;

    };
});
