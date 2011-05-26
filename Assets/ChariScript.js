public var accel : float = 500 ;
public var gravity : float = 0 ;


function Start () {
	
	// set Center of Mass
	var mass = transform.Find("CenterOfMass").transform.localPosition ;
	rigidbody.centerOfMass = mass ;
	
	// freeze rotation
	//~ rigidbody.constraints = RigidbodyConstraints.FreezeRotationZ;
	
	rigidbody.maxAngularVelocity = 5 ;
}

function Update() {

	if ( Input.GetKeyDown("r") )	Reset() ;
	
}

function FixedUpdate() {
		
	// forward accel
	//~ rigidbody.AddForce(transform.forward * Input.GetAxis("Vertical") * accel );
	transform.Find("RearWheelCollider").GetComponent(WheelCollider).motorTorque = Input.GetAxis("Vertical") * accel ;
	
	// steering
	var rot : float = Input.GetAxis("Horizontal") ;
	transform.Find("FrontWheelCollider").transform.Rotate(Vector3(0,rot,0)) ;
	
	// balance
	var tilt = rigidbody.rotation.eulerAngles.z ;
	if ( tilt > 180 ) tilt -= 360 ;
	
	
	
	// horizonal balance
	//~ transform.Find("CenterOfMass").transform.localPosition.x = Mathf.Sin( tilt * Mathf.Deg2Rad ) * 0.4 ;
	
	// vertical balance
	//~ transform.Find("CenterOfMass").transform.localPosition.y = - ( tilt * tilt ) / ( 90 * 90 ) * 50 ;
	//~ if ( transform.Find("CenterOfMass").transform.localPosition.y < -6 )	transform.Find("CenterOfMass").transform.localPosition.y = -6;
	//~ rigidbody.centerOfMass = transform.Find("CenterOfMass").transform.localPosition ;
	
	// Wheel Animation
	transform.Find("Chari").transform.Find("FrontWheel").transform.Rotate(Vector3(0,rot,0));
	
	// Tilt Animation
	transform.Find("Chari").transform.Rotate(Vector3(0, 0, rot)) ;
	
	// gravity
    rigidbody.AddForce( Vector3(0, -1, 0) * gravity );
	
	//~ TiltControll() ;
}

function TiltControll() {
	// prevent Z rotation fuck
	var eulerAngleVelocity = rigidbody.rotation.eulerAngles ;
	eulerAngleVelocity.z = 0 ;
	rigidbody.MoveRotation(Quaternion.Euler(eulerAngleVelocity)) ;
}

function Reset() {
	// reset rotation
	var newRot = Quaternion.identity ;
	newRot.y = transform.rotation.y ;
	transform.rotation = newRot ;
	
	// reset velocity
	rigidbody.velocity = Vector3.zero ;
	
	// reset torque
	rigidbody.angularVelocity = Vector3.zero ;
	
	// reset position
	transform.position.y += 10 ;
}