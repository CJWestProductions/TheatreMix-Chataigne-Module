# TheatreMix Chataigne Module

This module provides a framework to control the TheatreMix software made by James Holt. It follows the protocol laid out at [https://theatremix.com/features#oscAPI](https://theatremix.com/features#oscAPI).

Some values are returned when the user checks the "Subscribe" parameter:
- Subscription Active
- Cue Fired (Trigger)
- Last cue fired (Int)
- Gang L/R
- Record Offsets

All of the commands have also been implemented:

- Set Subscribed [internal parameter]
    - Subscribed (Boolean)

Cues:
- Go
- Back
- Jump
    - Number (String)
- Jump to Selected
- Mark Cue
    - Mode (Enum: Current, Selected)
    - Notes (String)
- Insert Cue
- Clone Cue
- Delete Cue

UI:
- Set Lock
    - Lock (Boolean)
- Select
    - Mode (Enum: Up, Down, Current)
- Undo
- Redo


Mics:
- Toggle Backup
    - Channel (String)
- Allocate Spare
    - Channel (String)
- Toggle Spare
- Remove Spare

Offsets:
- Record Offsets
    - Mode (Enum: Toggle, On, Off) 
        - Note: For On or Off mode, Chataigne must be actively subscribed to TheatreMix updates
- Clone Offsets


## Changelog
v1.1.0
- Add Offsets (record, clone)
- Bug fixes
    - Subscribe on load/init
    - Cue number is float
    - fix redo, jump selected
- github links in module.json

v1.0.0:
- basic functionality