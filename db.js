var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Workout = new Schema({
  user_id    : String,
  type       : String,
  reps       : Number,
  weight     : Number,
  notes      : String,
  date       : Date
});

mongoose.model( 'Workout', Workout);
mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/simpleWorkout' );

