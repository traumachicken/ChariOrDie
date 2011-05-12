var camera1 : GameObject;
var camera2 : GameObject;
var camera3 : GameObject;
var chari : GameObject ;
var light1 : Light;
var light2 : Light;
var flickering : boolean = false;
var on : boolean = true;
var speed = 0.8;

function Start() {

}


function OnGUI () {
	// Make a background box
	GUI.Box (Rect (10,10,100,120), "Camera");

	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (20,40,80,20), "1")) {
		camera1.camera.enabled=true;
		camera1.GetComponent(AudioListener).enabled = true;
		camera2.camera.enabled=false;
		camera2.GetComponent(AudioListener).enabled = false;
		camera3.camera.enabled=false;
		camera3.GetComponent(AudioListener).enabled = false;
		
	}

	// Make the second button.
	if (GUI.Button (Rect (20,70,80,20), "2")) {
		camera1.camera.enabled=false;
		camera1.GetComponent(AudioListener).enabled = false;
        camera2.camera.enabled=true;
		camera2.GetComponent(AudioListener).enabled = true;
		camera3.camera.enabled=false;
		camera3.GetComponent(AudioListener).enabled = false;
	}
	
	if (GUI.Button (Rect (20,100,80,20), "3")) {
		camera1.camera.enabled=false;
		camera1.GetComponent(AudioListener).enabled = false;
        camera2.camera.enabled=false;
		camera2.GetComponent(AudioListener).enabled = false;
		camera3.camera.enabled=true;
		camera3.GetComponent(AudioListener).enabled = true;
	}
	
	GUI.Box (Rect (120,10,100,120), "Light");
	
	if (GUI.Button (Rect (130,40,80,20), "on")) {
		flickering = false;
		light1.intensity = 8;
		light2.intensity = 1;
	}

	// Make the second button.
	if (GUI.Button (Rect (130,70,80,20), "off")) {
		light1.intensity = 0;
		light2.intensity = 0;
		flickering = false;
	}
	
	if (GUI.Button (Rect (130,100,80,20), "flicker")) {
		flickering = true;
	}
	
	
	GUI.Box (Rect (230,10,100,120), "Speed");
	
	if (GUI.Button (Rect (240,40,80,20), "slow")) {
		speed = 0.3;
	}


	if (GUI.Button (Rect (240,70,80,20), "high")) {
		speed = 0.8;
	}
	
	if (GUI.Button (Rect (240,100,80,20), "kamikaze")) {
		speed = 2;
	}
	
	GUI.Box (Rect (340,10,100,60), "wow crash!");
	
	if (GUI.Button (Rect (350,40,80,20), "Reset")) {
		chari.GetComponent(ChariScript).Restart();
	}
	
	
}

function Update(){
	
	if ( flickering ){
		if ( Time.frameCount % 5 == 0 ){
			on = !on;
			if ( on ){
				light1.intensity = 8;
				light2.intensity = 1;
			}else{
				light1.intensity = 0;
				light2.intensity = 0;
			}
		}
	}
	
}