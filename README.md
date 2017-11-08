# BigJ Software

BigJ Software is an inventory and payroll system specific for the BigJ store located in

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before installing grails, make sure that java SDK 1.4 or higher is installed on your machine.
you can learn how [here](https://www.java.com/en/download/help/version_manual.xml.)

##### Windows
Starting with Java 7 Update 40, you can find the Java version through the Windows Start menu.
1. Launch the Windows Start menu
2. Click on Programs
3. Find the Java program listing
4. Click About Java to see the Java version

##### Linux
* Check Java version by typing this in the terminal
`java -version`
* To install Java version 8
```
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install openjdk-8-jdk
```

### Installation

#### Windows

* Download the Grails version used [here](http://github.com/grails/grails-core/releases/download/v2.5.1/grails-2.5.1.zip).
* Extract it on a appropriate location, for example.

```
C:\Grails
```

* Create an environment variable GRAILS_HOME which points to the installation of grails. Refer [here](https://kb.wisc.edu/cae/page.php?id=24500).

```
Variable name: GRAILS_HOME
Variable value: C:\Grails
```

* Open terminal and input the following:

```
git clone https://github.com/jigsthegreat/BigJRepository.git
cd BigJRepository

grails run-app  
```

Now you can connect to the server localhost:8080

#### Linux
* Open terminal
* Download SDKMAN that will help you install the specific GRAILS version
```
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install grails 2.5.1
```
* Clone the repository and run it
```
git clone https://github.com/jigsthegreat/BigJRepository.git
cd BigJRepository

grails run-app
```

## Deployment

*For WAR file
```
grails war
```
And refer [here](http://docs.grails.org/3.0.17/guide/deployment.html)

## Built With

* [Grails](https://grails.org/)
* [AngularJs](https://angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)
* [Satellizer](https://github.com/sahat/satellizer)

## Authors
* Jireh Ballon
* Drexler Jan Cacho
* Francis John Conde
* J Matthew Gasataya
* Syvyl Arlette Inserto
* Emmanuel Peñaflorida

## Acknowledgments

* Iloilo Big J's Mart for accomodating questions. 
