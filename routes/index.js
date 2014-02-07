var utils = require('../utils');
var mongoose = require('mongoose');
var Workout = mongoose.model( 'Workout');
/*
 * GET home page.
 */

exports.index = function(req, res, next){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
  console.log(user_id);
  Workout.
    find({ user_id: user_id}).
    sort( '-date' ).
    exec( function(err, workouts, count ) {
      if( err ) return next( err );

      res.render('index', {
        title: "simple workout",
        workouts: workouts
      });
  });
};

exports.create = function(req, res, next) {
  new Workout({
    user_id : req.cookies.user_id,
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

exports.destroy = function(req, res, next) {
  Workout.findById( req.params.id, function( err, workout) {
    workout.remove( function( err, workout) {
      res.redirect('/');
    });
  });
};

// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
