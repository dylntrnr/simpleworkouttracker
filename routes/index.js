var utils = require('../utils');
var mongoose = require('mongoose');
var Workout = mongoose.model( 'Workout');
/*
 * GET home page.
 */

exports.index = function(req, res, next){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
  Workout
    .find({ user_id: user_id})
    .sort( '-created' )
    .exec( function(err, workouts) {
      if( err ) return next( err );

      res.render('index', {
        title: "simple workout",
        workouts: workouts
      });
  });
};

exports.create = function(req, res, next) {
  var offset = req.body.offset;
  offset = +offset;
  new Workout({
    user_id : req.cookies.user_id,
    type    : req.body.type,
    reps    : req.body.reps,
    weight  : req.body.weight,
    offset  : offset,
    created : Date.now()
  }).save( function(err, workouts, count){
    res.redirect( '/');
  });
};

exports.destroy = function(req, res, next) {
  Workout.findById( req.params.id, function( err, workout) {
    if( err ) return next( err );
    workout.remove( function( err, workout) {
      if( err ) return next( err );
      res.redirect('/');
    });
  });
};

exports.edit = function( req, res, next) {
  Workout.find( function ( err, workouts) {
    res.render( 'edit', {
      title: "Edit",
      workouts : workouts,
      current  : req.params.id
    });
  });
};

exports.plotjson = function( req, res, next) {
  Workout.find({user_id: req.cookies.user_id})
    .where('type').equals(req.params.id)
    .sort("created")
    .select('user_id weight reps created')
    .exec( function ( err, workouts) {
      res.json(workouts);
  });
};

exports.plot = function( req, res, next) {
  res.render('plot',{
    title: "plot",
    query: req.params.id
  });
}

exports.update = function( req, res, next) {
  Workout.findById( req.params.id, function( err, workout) {
    workout.type    = req.body.type;
    workout.reps    = req.body.reps;
    workout.weight  = req.body.weight;
    workout.updated_at = Date.now();
    workout.save( function(err, workouts, count){
      res.redirect( '/');
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
