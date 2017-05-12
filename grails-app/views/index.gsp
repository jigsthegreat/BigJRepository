<!DOCTYPE html>
<html ng-app="BigJApp" ng-controller="BaseController">

<head>

  <meta charset="UTF-8">
  <title></title>
  <asset:stylesheet href="application.css" />
  <asset:javascript src="application.js" />

</head>

<body>

  <nav class="navbar nav-color" ng-if="isAuthenticated()">
    <div class="container-fluid" ng-if="isAuthenticated()">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed navbar-default" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar nav-color"></span>
          <span class="icon-bar nav-color"></span>
          <span class="icon-bar nav-color"></span>
        </button>
        
        <a href=""><img class="imgtop" src="../BigJRepository/images/bgjname9.png"></a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      %{-- {{ isUser() }} --}%
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" ng-if="isAuthenticated()">
        <ul class="nav navbar-nav">
          <li><a href="#" ui-sref="home" class="nav-text"><span class="glyphicon glyphicon-home"></span> HOME <span class="sr-only">(current)</span></a></li>
          <li class="dropdown">
            <a href="" class="nav-text dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" ng-if="isAuthenticated() && isUser()"><span class="glyphicon glyphicon-user"></span> SUPPLIER <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#" ui-sref="suppliers">View Suppliers</a></li>
              <li><a href="#" ui-sref="add-purchase-order-transaction">Add Purchase Order</a></li>
              <li><a href="#" ui-sref="purchase-order-transactions">Purchase Orders</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="" class="nav-text dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" ng-if="isAuthenticated() && isUser()"><span class="glyphicon glyphicon-user"></span> CLIENT <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#" ui-sref="clients">View Clients</a></li>
              <li><a href="#" ui-sref="add-pricelist-transaction">Add Pricelist</a></li>
              <li><a href="#" ui-sref="pricelist-transactions">View Pricelist</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="" class="nav-text dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" ng-if="isAuthenticated() && isUser()"><span class="glyphicon glyphicon-th-list"></span> INVENTORY <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="" ui-sref="products">Products</a></li>
              <li><a href="" ui-sref="storage">Warehouse</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="" class="nav-text" ui-sref="employees" ng-if="isAuthenticated() && isUser()" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span> EMPLOYEES <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#" ui-sref="add-dtr">DTR</a></li>
              <li><a href="#" ui-sref="payroll">Payroll</a></li>
            </ul>
          </li>
        </ul>
        
          <ul class="nav navbar-nav navbar-right">
            <li ng-if="isAuthenticated() && isUser()">
              %{-- <select data-toggle="dropdown" class="form-control navbar-branch" ng-model="branch" ng-change="changeBranchId(branch)" style="width:150px">
                <option disabled value selected>Choose branch</option>
                <option value="1">ALDEGUER</option>
                <option value="2">HOSKYN</option>
                <option value="3">TANZA</option>
              </select> --}%
              %{-- {{ hehehe }} --}%
              <select ng-disabled="hehehe" data-toggle="dropdown" class="form-control navbar-branch" data-ng-options="o.name for o in options" data-ng-model="selectedOption" style="width:150px" ng-change="changeBranchId(selectedOption.id)"></select>
              %{-- {{ selectedOption.id }} --}%
            </li>
            <li class="dropdown ">
              <a href="" name="dropdown" class="dropdown-toggle nav-text" data-toggle="dropdown" role="button"
               aria-haspopup="true" aria-expanded="false">{{ loginUser.firstName }} {{ loginUser.lastName }}<i
                    class="glyphicon glyphicon-triangle-bottom"></i>
              </a>
              <ul class="dropdown-menu">
                  <li><a href="#" name="logout" ng-click="logout()" class="nav-text"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
              </ul>
              %{-- <a href="#" ng-click="logout()" name="logout" class="nav-text"><span class="glyphicon glyphicon-log-out"></span> Logout</a> --}%
            </li>
          </ul>
        <!-- <form class="navbar-form navbar-left" role="search">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>

      </div><!-- /.navbar-collapse -->
      </div>
    </div>
    <!-- /.container-fluid -->
  </nav>
  <div class="row">
    <div class="col-md-12">
      <div ui-view></div>
    </div>
  </div>


</body>

</html>
