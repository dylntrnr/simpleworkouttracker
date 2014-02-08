var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Workout = new Schema({
  user_id    : String,
  type       : String,
  reps       : Number,
  weight     : Number,
  notes      : String,
  updated_at : { type: Date, default: Date.now()},
  created    : Date
});

mongoose.model( 'Workout', Workout);
mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/simpleWorkout' );

