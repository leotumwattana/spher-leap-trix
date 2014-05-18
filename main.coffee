# Use this terminal command to find device id
# ls /dev | grep -i sphero

if Meteor.isClient

  # =====================
  # Helper methods
  # =====================

  circleDirection = (gesture, frame) ->
    clockwise = false
    try
      pointableID = gesture.pointableIds[0]
      direction = frame.pointable(pointableID).direction
      dotProduct = Leap.vec3.dot direction, gesture.normal
      if dotProduct > 0
        clockwise = true
      clockwise
    catch error
      console.log error

  handleKeyTapGesture = (gesture) ->
    console.log "It's alive!!!"
    Meteor.call 'moveSphero', 'FORWARD', 128

  handleCircleGesture = (gesture, frame) ->
    console.log "turning!!!"
    clockwise = circleDirection gesture, frame
    angle = if clockwise then 1 else -1
    Meteor.call 'changeHeading', angle

  setupLeapMotionForTapGesture = ->
    controller = Leap.loop { enableGestures: true }, (frame) ->
      if frame.valid && frame.gestures.length > 0
        frame.gestures.forEach (gesture) ->
          switch gesture.type
            when 'circle'
              handleCircleGesture(gesture, frame)
            when 'keyTap'
              handleKeyTapGesture(gesture)

  # =====================
  # Meteor event handlers
  # =====================

  Template.game.events
    'click #connect': ->
      Meteor.call 'setupSphero'

  # =====================
  # Init code
  # =====================

  setupLeapMotionForTapGesture()


if Meteor.isServer

  # =====================
  # Variables
  # =====================
  @heading = 0

  # =====================
  # Helper functions
  # =====================
  delay = (ms, func) -> setTimeout func, ms

  Meteor.methods

    changeHeading: (angle) =>
      @heading += angle
      if @heading >= 359
        @heading = 0
      else if @heading <= 0
        @heading = 359
      console.log @heading
      false

    moveSphero: (direction, speed) =>
      if direction == 'FORWARD'
        @sphero.roll speed, @heading, 1
        delay 500, =>
          @sphero.roll 0, @heading, 1
      false

    setupSphero: =>
      console.log "should setup sphero"
      Spheron = Meteor.require 'spheron'
      @sphero = Spheron.sphero()
      spheroPort = '/dev/cu.Sphero-RRG-AMP-SPP'
      COLORS = Spheron.toolbelt.COLORS

      @sphero.on 'open', =>
        @sphero.setRGB COLORS.BLUE, false

      @sphero.open spheroPort





