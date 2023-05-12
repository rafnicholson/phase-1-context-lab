/* Your Code Here */

class Employee {
    constructor(arr) {
        this.firstName = arr[0];
        this.familyName = arr[1];
        this.title = arr[2];
        this.payPerHour = arr[3];
        this.timeInEvents = [];
        this.timeOutEvents = [];
    }

    allWagesFor() {
        const eligibleDates = this.timeInEvents.map(function (e) {
            return e.date
        })

        const payable = eligibleDates.reduce(function (memo, d) {
            return memo + wagesEarnedOnDate.call(this, d)
        }.bind(this), 0)
        return payable
    }
}

function createEmployeeRecord(arr) {
    const employee = new Employee(arr);
    employee.hoursWorkedOnDate = hoursWorkedOnDate.bind(employee);
    return employee;
}

function createEmployeeRecords(nestedArrays) {
    return nestedArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const parsedHour = parseInt(hour, 10);

    const timeInEvent = {
        type: "TimeIn",
        hour: parsedHour,
        date: date,
    }
    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    const parsedHour = parseInt(hour, 10);

    const timeOutEvent = {
        type: "TimeOut",
        hour: parsedHour,
        date: date,
    }
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = this.hoursWorkedOnDate(date);
    const payOwed = hoursWorked * this.payPerHour;
    return payOwed;
}

function findEmployeeByFirstName(collection, firstName) {
    return collection.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
    for (const employeeRecord of employeeRecords) {
        const employeeWages = employeeRecord.allWagesFor();
        totalPayroll += employeeWages;
    }
    return totalPayroll;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

