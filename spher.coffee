if Meteor.isClient
  Template.game.rendered = ->
    $('body').html(renderer.view);
