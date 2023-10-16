let serial; // variable to hold an instance of the serialport library
let latestData = "waiting for data";
let mappedData = [0,0,0];

function serialSetup() {
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.list();
    serial.openPort('/dev/tty.usbmodem101');

    serial.on('connected', serverConnected);

    serial.on('list', gotList);

    serial.on('data', gotData);

    serial.on('error', gotError);

    serial.on('open', gotOpen);

    serial.on('close', gotClose);
}

function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
    }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose() {
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {
    let currentString = serial.readLine();
    trim(currentString);
    if (!currentString) return;
    // console.log(currentString);
    latestData = currentString;
    mappedData = latestData.split(' ').map(function(item) {return Math.max(parseInt(item),0);});
}
