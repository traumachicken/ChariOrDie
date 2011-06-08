public var accel : float = 2000 ;
public var brake : float = 2000 ;
public var gravity : float = 3000 ;
public var steeringAccel : float = 20 ;
public var steeringMax : float = 40 ;
public var steeringMin : float = 10 ;
public var maxVelocity : float = 100 ;

private var steeringDR : float = 0 ;

function Start () {
	
	// set Center of Mass
	var mass = transform.Find("CenterOfMass").transform.localPosition ;
	rigidbody.centerOfMass = mass ;
	
	SetSuspension() ;
	
	steeringDR = ( maxVelocity ) * ( maxVelocity ) / steeringMax ;
		
}

function Update() {

	if ( Input.GetKeyDown("r") )	Reset() ;
	
}

function FixedUpdate() {
	
	transform.Find("RearWheelCollider").GetComponent(WheelCollider).motorTorque /= 1.5;
	transform.Find("RearWheelCollider").GetComponent(WheelCollider).brakeTorque /= 1.5 ;
	
	var forwardVelocity = transform.InverseTransformDirection(rigidbody.velocity).z ;
	// forward accel
	if ( Input.GetKeyDown("w") && forwardVelocity < maxVelocity ){
		transform.Find("RearWheelCollider").GetComponent(WheelCollider).motorTorque = accel;
	}
	if ( Input.GetKey("s") ){
		transform.Find("RearWheelCollider").GetComponent(WheelCollider).brakeTorque = brake;
	}
	
	// steering
	var steer2 = steeringMax - ( ( forwardVelocity / ( maxVelocity / 2 ) ) * steeringMax ) ;
	if ( steer2 < steeringMin ) steer2 = steeringMin ;
	var steer3 = Input.GetAxis("Horizontal") * steer2 ;
	transform.Find("FrontWheelCollider").GetComponent( WheelCollider ).steerAngle = steer3;
	
	// gravity
    rigidbody.AddForce( Vector3(0, -1, 0) * gravity );
	
	// animation 
	Animate() ;
	
}

function Animate() {
	
	var bike = transform.Find("Chari").transform.Find("superbicycle") ;
	var steer = transform.Find("FrontWheelCollider").GetComponent(WheelCollider).steerAngle ;
	
	// Wheel Animation
	bike.transform.Find("FrontWheel").transform.localEulerAngles = Vector3(0,steer,0) ;
	bike.transform.Find("handle").transform.localEulerAngles = Vector3(270,steer,0) ;
	
	// Tilt Animation
	bike.transform.localEulerAngles = Vector3(0, 180, -steer/2) ;
	
	var roll = transform.Find("FrontWheelCollider").GetComponent(WheelCollider).rpm ;
	// Wheel Animation
	bike.transform.Find("FrontWheel").transform.Rotate( roll, 0, 0 ) ;
	bike.transform.Find("RearWheel").transform.Rotate( roll, 0, 0 ) ;
	//~ print (roll) ;

}

function TiltControll() {
	// prevent Z rotation fuck
	var eulerAngleVelocity = rigidbody.rotation.eulerAngles ;
	eulerAngleVelocity.z = 0 ;
	rigidbody.MoveRotation(Quaternion.Euler(eulerAngleVelocity)) ;
}

function SetSuspension() {
	var distance = 0.1 ;
	var spring = 100 ;
	var damp = 100 ;
	var target = 1 ;
	
	var fwc = transform.Find("FrontWheelCollider").GetComponent(WheelCollider) ;
	fwc.suspensionDistance = distance ;
	fwc.suspensionSpring.spring = spring ;
	fwc.suspensionSpring.damper = damp ;
	fwc.suspensionSpring.targetPosition = target ;
	
	fwc = transform.Find("RearWheelCollider").GetComponent(WheelCollider) ;
	fwc.suspensionDistance = distance ;
	fwc.suspensionSpring.spring = spring ;
	fwc.suspensionSpring.damper = damp ;
	fwc.suspensionSpring.targetPosition = target ;
	
	fwc = transform.Find("RearTrainingWheelColliderR").GetComponent(WheelCollider) ;
	fwc.suspensionDistance = distance ;
	fwc.suspensionSpring.spring = spring ;
	fwc.suspensionSpring.damper = damp ;
	fwc.suspensionSpring.targetPosition = target ;
	
	fwc = transform.Find("RearTrainingWheelColliderL").GetComponent(WheelCollider) ;
	fwc.suspensionDistance = distance ;
	fwc.suspensionSpring.spring = spring ;
	fwc.suspensionSpring.damper = damp ;
	fwc.suspensionSpring.targetPosition = target ;
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