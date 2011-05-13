var other : GUIScript;
var start_position : Vector3 ;


public var accel : float = 0.15 ;
public var friction : float = 0.995 ;
public var maxSpeed : float = 30 ;
public var rotationSpeed : float = 8.0;
public var jumpSpeed : float = 50.0 ;
public var gravity : float = 1.0 ;

private var vertical : float = 0 ;
private var horizonal : float = 0;
private var isControllable : boolean  = true ;
private var controller : CharacterController ;
private var moveDirection : Vector3 = Vector3.zero ;

function Start () {
	start_position = transform.position;
	controller = GetComponent( CharacterController );
}

function Update() {
	
    if (controller.isGrounded) {
		
		horizonal = 0 ;
		
		vertical += Input.GetAxis("Vertical") * accel ;
		if ( vertical > maxSpeed )	vertical = maxSpeed ;
        
        
        var rot : float = Input.GetAxis("Horizontal") ;
		if( vertical < 3.0 )	rot *= vertical / 3.0 ;
        controller.transform.Rotate( 0, rot, 0 );
        if (Input.GetButton ("Jump")) {
            horizonal = jumpSpeed;
        }
    }
	
    // Apply gravity
    horizonal -= gravity ;
    
	// Don't back
	if ( vertical < -1.5 )	vertical = -1.5 ;
	
    // Move the controller
    moveDirection = Vector3( 0, horizonal, vertical );
	moveDirection = transform.TransformDirection(moveDirection);
	
	controller.Move(moveDirection * Time.deltaTime);
	
	vertical *= friction ;
}