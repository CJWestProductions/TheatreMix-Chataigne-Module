
params =  local.parameters;
vals = local.values;
root = root;
script = script;

var subscribeTimeInterval = 0;
var subscribeTimeLeft = 0;


function init()
{
    script.setUpdateRate(1);

    local.register("/subscribeok","subscribeCallback");
    local.register("/subscribefail","subscribeCallback");
    local.register("/cuefired","cueCallback");
    local.register("/ganglr","gangCallback");
    local.register("/recordoffsets","offsetsCallback");

    if(vals.subscriptionActive.get()) sendSubscribe();
}

function update(deltaTime)
{
    if(vals.subscriptionActive.get()) {
        subscribeTimeLeft -= 1;
        if(subscribeTimeLeft < subscribeTimeInterval/2) sendSubscribe();
    }
}

function moduleParameterChanged(param)
{
    if(param.name=="local" || param.name=="remoteHost" || param.name=="remotePort"){
        // gotta toggle this when you change network settings.
        param.getParent().listenToFeedback.set(false);
        param.getParent().listenToFeedback.set(true);

        if(vals.subscriptionActive.get()) sendSubscribe();
    } else if (param.name == "listenToFeedback"){
        param.set(true); // disallow turning this off. It's hidden, don't mess with it
    } else if (param.name == "subscribe"){
        if(param.get()) sendSubscribe();
        else vals.subscriptionActive.set(false);
    }
}

function moduleValueChanged(value)
{

}

// ------ Helper Functions ------ //
function sendSubscribe()
{
    local.send("/subscribe");
}


// ------ Incoming Message Callback Functions ------ //

//Generic:
function oscEvent(address, args)
{
	//param "address" is the address of the OSC Message
	//param "args" is an array containing all the arguments of the OSC Message

	script.log("OSC Message received "+address+", "+args.length+" arguments");
	for(var i=0; i < args.length; i++)
	{
		script.log(" > "+args[i]);
	}
}

function subscribeCallback(address,args)
{
    if(address.contains(fail)) {
        vals.subscriptionActive.set(false);
        util.showMessageBox("Subscription Failed.", "Maximum number of clients are subscribed","warning");
    } else {
        subscribeTimeInterval = args[0];
        subscribeTimeLeft = args[0];
        vals.subscriptionActive.set(true);
    }
}

function cueCallback(address,args)
{
    vals.cueFired.trigger();
    vals.lastCueFired.set(args[0]);
}

function gangCallback(address,args)
{
    if(args[0]=="on") vals.gangLevel.set(true);
    else vals.gangLevel.set(false);
}

function offsetsCallback(address,args)
{
    if(args[0]=="on") vals.offsetsStatus.set(true);
    else vals.offsetsStatus.set(false);
}

// ------ Command Callbacks ------ //

function setSubscribed(status)
{
    params.subscribe.set(status);
}

function sendGo()
{
    local.send("/go");
}

function sendBack()
{
    local.send("/back");
}

function sendJump(cue)
{
    local.send("/jump",cue);
}

function sendJumpToSelected()
{
    local.send("/jumpselected");
}

function sendMark(mode,notes)
{
    if(notes.length>0) local.send("/markcue",mode,notes);
    else local.send("/markcue",mode);
}

function sendInsert()
{
    local.send("/insertcue");
}

function sendClone()
{
    local.send("/clonecue");   
}

function sendDelete()
{
    local.send("/deletecue");
}

function sendLock(lock)
{
    local.send(lock ? "/lock" : "/unlock");
}

function sendSelect(mode)
{
    local.send("/select",mode);
}

function sendUndo()
{
    local.send("/undo");
}

function sendRedo()
{
    local.send("/redo");   
}

function toggleBackup(channel)
{
    local.send("/togglebackup",channel);
}

function allocateSpare(channel)
{
    local.send("/allocatespare",channel);
}

function toggleSpare()
{
    local.send("/togglespare");
}

function removeSpare()
{
    local.send("/removespare");
}