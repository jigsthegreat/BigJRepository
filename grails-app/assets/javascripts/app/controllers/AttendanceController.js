angular.module('BigJApp').controller('AttendanceController', function ($scope, $state, $stateParams, Attendance, Employee, branchId) {
    $scope.employeeId = $stateParams.employee;
    $scope.selectedId = $stateParams.id;
    $scope.employees = Employee.query();
    $scope.attendances = Attendance.query();

    $scope.getAttendance = function (attendanceId) {
        var i;
        for (i = 0; i < $scope.attendances.length; i++) {
            if ($scope.attendances[i].id == attendanceId) {
                return $scope.attendances[i];
            }
        }

    };

    $scope.format = 'dd-MMM-yyyy';
    $scope.maximumDate = new Date();
    $scope.calendar = {};

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.calendar.opened = true;
    };

    $scope.getEmployee = function (employeeId) {
        var i;
        for (i = 0; i < $scope.employees.length; i++) {
            if ($scope.employees[i].id == employeeId) {
                return $scope.employees[i];
            }
        }
    };

    $scope.addAttendance = function () {
        var attendance = new Attendance();
        attendance.date = new Date($scope.formInfo.date);
        attendance.date.setHours(00, 00, 0, 0);
        attendance.date.setDate(attendance.date.getDate() + 1);
        attendance.employee = $scope.employeeId;
        if ($scope.formInfo.type != 'absent') {
            attendance.isPresent = true;
            attendance.isWholeDay = $scope.formInfo.type;
        }
        Attendance.save(attendance);
        setTimeout(function () {
            $state.go('attendances');
        }, 1000);
    };

    $scope.updateAttendance = function () {
        var attendance = Attendance.get({attendance: $scope.selectedId});
        attendance.employee = $scope.employeeId;
        if ($scope.selectedAttendance.type != 'absent') {
            attendance.isPresent = true;
            attendance.isWholeDay = $scope.selectedAttendance.type;
        }
        Attendance.update({attendance: $scope.selectedId}, attendance, function () {
            $state.go('attendances');
        });
    };
});