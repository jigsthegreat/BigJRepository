angular.module('BigJApp').controller('EmployeeController', function ($scope, User, Attendance, toaster, $state, $stateParams, Employee, Branch, branchId) {
    var selectedId = $stateParams.id;
    $scope.employees = Employee.query();
    $scope.attendances = Attendance.query();
    $scope.branches = Branch.query();
    $scope.displayedCollection = [].concat($scope.employees);


    $scope.create = function () {
        var employee = new Employee();
        employee.firstName = $scope.formInfo.firstName;
        employee.middleName = $scope.formInfo.middleName;
        employee.lastName = $scope.formInfo.lastName;
        employee.salaryRate = $scope.formInfo.salaryRate;
        employee.birthdate = $scope.formInfo.birthdate;
        employee.contactNumber = $scope.formInfo.contactNumber;
        employee.address = $scope.formInfo.address;
        if ($scope.formInfo.branch != undefined) {
            branchId.value = $scope.formInfo.branch.id;
        }
        employee.branch = branchId.value;
        Employee.save(employee, function () {
            toaster.success({
                title: "Success",
                body: "Employee added successfully!"
            });
            setTimeout(function () {
                $scope.employees = Employee.query();
            }, 1000);
        }, function () {
            toaster.error({
                title: "Error",
                body: "Error!"
            });
        });
    };

    $scope.select = function (employee) {
        $scope.selectedEmployee = employee;
    }

    $scope.delete = function (employee) {
        Employee.delete({employee: employee.id}, function () {
            toaster.pop({
                title: "Delete",
                body: "Employee deleted successfully!"
            });
            setTimeout(function () {
                $scope.employees = Employee.query();
            }, 1000);
        }, function () {
            toaster.error({
                title: "Error",
                body: "Error deleting employee!"
            });
        });
    };

    $scope.update = function () {
        // var employee = Employee.get({employee: selectedId});
        var employee = {
            firstName: $scope.selectedEmployee.firstName,
            middleName: $scope.selectedEmployee.middleName,
            lastName: $scope.selectedEmployee.lastName,
            birthdate: new Date($scope.selectedEmployee.birthdate),
            contactNumber: $scope.selectedEmployee.contactNumber,
            address: $scope.selectedEmployee.address,
            salaryRate: $scope.selectedEmployee.salaryRate,
            //branch here
        };
        // employee.firstName = $scope.selectedEmployee.firstName;
        // employee.lastName = $scope.selectedEmployee.lastName;
        // employee.salaryRate = $scope.selectedEmployee.salaryRate;
        // employee.branch = $scope.selectedEmployee.branch;
        Employee.update({employee: $scope.selectedEmployee.id}, employee, function () {
            // $state.go('employees');
            toaster.success({
                title: "Success",
                body: "Employee updated successfully!"
            });
            $scope.employees = Employee.query();
        }, function () {
            toaster.error({
                title: "Error",
                body: "Error updating employee."
            });
        });
    };
    $scope.format = 'dd-MMM-yyyy';
    $scope.maximumDate = new Date();
    $scope.calendar = {};

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.calendar.opened = true;
    };

    $scope.newAttendances = {};
    $scope.data = {dateDropDownInput: new Date()};

    $scope.isAttendanceExist = function (employee) {
        var i;
        var day = new Date($scope.data.dateDropDownInput);
        day.setHours(0, 0, 0, 0);
        for (i = 0; i < employee.attendances.length; i++) {
            var day2 = new Date(employee.attendances[i].date);
            day2.setHours(0, 0, 0, 0);
            if (day.valueOf() == day2.valueOf()) {
                return true;
            }
        }

        return false;
    };

    $scope.findAttendance = function (employee) {
        var i;
        var day = new Date($scope.data.dateDropDownInput);
        day.setHours(0, 0, 0, 0);
        for (i = 0; i < employee.attendances.length; i++) {
            var day2 = new Date(employee.attendances[i].date);
            day2.setHours(0, 0, 0, 0);
            if (day.valueOf() == day2.valueOf()) {
                return employee.attendances[i];
            }
        }
    };

    $scope.saveAttendances = function () {
        for (var i in $scope.newAttendances) {
            var attendance = new Attendance();
            attendance.date = new Date($scope.data.dateDropDownInput);
            attendance.date.setHours(00, 00, 0, 0);
            attendance.employee = i;
            if ($scope.newAttendances[i].status != 'absent') {
                attendance.isPresent = true;
                attendance.isWholeDay = $scope.newAttendances[i].status;
            }
            Attendance.save(attendance);
            setTimeout(function () {
                $scope.employees = Employee.query();
                $window.location.reload();
            }, 1000);
        }
    };

    $scope.edit = function (attendance) {
        $scope.oneAttendance = attendance;
    };

    $scope.updateAttendance = function () {
        var attendance = Attendance.get({attendance: $scope.oneAttendance.id});
        console.log(attendance);
        attendance.employee = $scope.oneAttendance.employee;
        if ($scope.selectedAttendance.type != 'absent') {
            attendance.isPresent = true;
            attendance.isWholeDay = $scope.selectedAttendance.type;
        } else {
            attendance.isPresent = false;
            attendance.isWholeDay = false;
        }
        Attendance.update({attendance: $scope.oneAttendance.id}, attendance, function () {
            toaster.success({title: "Success", body: "Attendance updated successfully!"});
            setTimeout(function () {
                $scope.employees = Employee.query();
            }, 1000);
        });
    };

    $scope.newAttendancesSize = function () {
        var j = 0;
        for (var i in $scope.newAttendances) {
            j++;
        }
        return j;
    };

    $scope.$watch("data.dateDropDownInput", function () {
        $scope.employees = Employee.query();
    });

    $scope.showModal = function (id) {
        $scope.oneEmployee = Employee.get({employee: id});
    };

    $scope.getBirthdate = function (date) {
        return new Date(date);
    };
    var tabClasses;

    function initTabs() {
        tabClasses = ["", "", "", ""];
    }

    $scope.getTabClass = function (tabNum) {
        return tabClasses[tabNum];
    };

    $scope.getTabPaneClass = function (tabNum) {
        return "tab-pane " + tabClasses[tabNum];
    }

    $scope.setActiveTab = function (tabNum) {
        initTabs();
        tabClasses[tabNum] = "active";
    };

    // $scope.datePicker.date = {startDate: null, endDate: null};

    //Initialize
    initTabs();
    $scope.setActiveTab(1);
});
