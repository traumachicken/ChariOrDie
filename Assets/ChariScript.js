var other : GUIScript;
var start_position : Vector3 ;
var friction = 0;

function Start () {
    // Find the OtherScript which is attached to any game object in the scene.
    other = FindObjectOfType(GUIScript);
	start_position = transform.position;
}
function Update() {

    transform.Rotate(0, other.speed, 0);
    transform.Translate(other.speed, 0, 0);
	
}

function Restart() {
	transform.position = start_position;
	transform.rotation = Quaternion(0,0,0,0);
}

function OnCollisionStay(collisionInfo : Collision) {
	//~ transform.Rotate(0, other.speed, 0);
    //~ transform.Translate(other.speed, 0, 0);
	//~ rigidbody.AddRelativeForce(Vector3.forward * other.speed);
	//~ rigidbody.rotation = Quaternion(0, other.speed, 0, 0);
	//~ rigidbody.AddForce(Vector3.right * other.speed * 40);
	//~ rigidbody.velocity = Vector3( other.speed * 10, 0, 0 );
    
}

function OnCollisionEnter(collisionInfo:Collision){
	
}