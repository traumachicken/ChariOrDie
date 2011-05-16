//~ private var transform : Transform ;
private var moveDirection : Vector3 ;
private var fwd : Vector3 ;
private var rot : Vector3 ;


function Start () {
	//~ transform = GetComponent("Transform") ;
}

function Update () {
	//~ moveDirection = Vector3( 0, 0, 3 );
	//~ moveDirection = transform.TransformDirection(moveDirection);
	
	
}

function FixedUpdate () {
	
	rot = Vector3.zero ;
	
	fwd = transform.TransformDirection (Vector3( 0.3, 0, 1) ) ;
    if (Physics.Raycast (transform.position, fwd, 104)) {
		//~ rigidbody.AddTorque( 0, -500, 0 ) ;
		rot = Vector3( 0, -1, 0 ) ;
    }
	fwd = transform.TransformDirection (Vector3( -0.3, 0, 1) ) ;
	if (Physics.Raycast (transform.position, fwd, 104)) {
		//~ rigidbody.AddTorque( 0, -500, 0 ) ;
		rot = Vector3( 0, 1, 0 ) ;
    }
	transform.Rotate( rot ) ;
	
	
	moveDirection = Vector3( 0, 0, 30 ) ;
	moveDirection = transform.TransformDirection( moveDirection ) ;
	rigidbody.AddForce ( moveDirection ) ;
}