# ls /dev | grep -i sphero

if Meteor.isClient

  setupLeapMotionForTapGesture = ->

    controller = Leap.loop { enableGestures: true }, (frame) ->
      if frame.valid && frame.gestures.length > 0
        frame.gestures.forEach (gesture) ->
          switch gesture.type
            when 'keyTap'
              handleKeyTapGesture(gesture)

    handleKeyTapGesture = (gesture) ->
      console.log "It's alive!!!"
      Meteor.call 'moveSphero', 'FORWARD', 128

  setupLeapMotionForTapGesture()

  Meteor.call 'setupSphero'


if Meteor.isServer

  safeModeTimeout = (safeMode) ->
    if safeMode
      setTimeout ->
        stopSphero sphero, 2000

  Meteor.methods

    moveSphero: (direction, speed) ->
      if direction == 'FORWARD'
        @sphero.heading = 0
        @sphero.roll speed, 0, 1
        safeModeTimeout true

    setupSphero: ->
      spheron = Meteor.require 'spheron'
      @sphero = spheron.sphero()
      spheroPort = '/dev/cu.Sphero-RYW-AMP-SPP'
      COLORS = spheron.toolbelt.COLORS

      @sphero.on 'open', ->
        @sphero.setRGB COLORS.BLUE, false

      @sphero.open spheroPort





