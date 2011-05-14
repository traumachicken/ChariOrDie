public var cam : Camera ;

public var sensiX : float = 5.0 ;
public var sensiY : float = 5.0 ;
public var minX : float = -360 ;
public var maxX : float = 360 ;
public var minY : float = -60 ;
public var maxY : float = 60 ;

private var rotationX : float = 0 ;
private var rotationY : float = 0 ;

private var originalRotation : Quaternion ;

function Start () {
	originalRotation = cam.transform.localRotation ;
}


function Update () {
	if ( Screen.lockCursor )		return ;
	
	rotationX += Input.GetAxis("Mouse X") * sensiX ;
	rotationY += Input.GetAxis("Mouse Y") * sensiY ;
	
	rotationX = ClampAngle ( rotationX, minX, maxX ) ;
	rotationY = ClampAngle ( rotationY, minY, maxY ) ;
	
	var xQ = Quaternion.AngleAxis ( rotationX, Vector3.up ) ;
	var yQ = Quaternion.AngleAxis ( rotationY, Vector3.left ) ;
	
	cam.transform.localRotation = originalRotation * xQ * yQ ;
}

function ClampAngle (angle : float , min : float, max : float) {
		if (angle < -360)
			angle += 360;
		if (angle > 360)
			angle -= 360;
		return Mathf.Clamp (angle, min, max);
}