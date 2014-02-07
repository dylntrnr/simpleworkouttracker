
var mongoose = require('mongoose');
var Workout = mongoose.model( 'Workout');
/*
 * GET home page.
 */

exports.index = function(req, res){
  Workout.find( function(err, workouts, count ) {
    res.render('index', {
      title: "simple workout",
      workouts: workouts
    });
  });
};

exports.create = function(req, res) {
  console.log(req.body);
  new Workout({
    type    : req.body.type,
    reps    : req.body.reps,
    weight  : req.body.weight,
    notes   : req.body.notes,
    date    : Date.now(),
    updated_at : Date.now()
  }).save( function(err, workouts, count){
    res.redirect( '/');
  });
};
