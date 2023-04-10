const EventEmitter = require('events');

// Create class
class MyEmitter extends EventEmitter {}

// Init object
const newEmitter = new MyEmitter();

// Event listener
newEmitter.on('event', () => console.log('Event fired!'));

// Init event
newEmitter.emit('event');
newEmitter.emit('event');