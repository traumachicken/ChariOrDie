public var speed : float = 2000 ;
public var anglerSpeed : float = 2300 ;
public var gravity : float = 100 ;
public var health : float = 100 ;

private var speedWave : float = 0 ;
private var angleWave : float = 0 ;

private var character : CharacterController ;
private var isKnockdown : boolean = false ;
private var isGrounded : boolean = false ;
private var isDead : boolean = false ;
private var player : GameObject ;
private var currentHealth = health ;

function Start() {
	//~ character = GetComponent(CharacterController) ;
	//~ rigidbody.freezeRotation = true ;
	player = GameObject.FindWithTag("Player") ;
}

function Update () {
	if ( currentHealth < 1 )	Dead() ;
}

function FixedUpdate () {
	if ( isKnockdown )	return ;
	if ( !isGrounded ) {
		rigidbody.AddForce( Vector3( 0, -1, 0 ) * gravity ) ;
		return ;
	}
	
	var m2p = player.transform.position - transform.position ;
	if ( m2p.magnitude  > 100 )	return ;
	
	// move
	speedWave ++ ;
	if ( speedWave > 360 )	speedWave = 0 ;
	var rad : float = Mathf.Deg2Rad * speedWave ;
	//~ character.SimpleMove( transform.forward * Mathf.Abs(Mathf.Sin(rad)) * speed ) ;
	rigidbody.AddRelativeForce( Vector3.forward * Mathf.Abs(Mathf.Sin(rad)) * speed ) ;
	
	// angle
	angleWave ++ ;
	if ( angleWave > 360 )		angleWave = 0 ;
	rad = Mathf.Deg2Rad * angleWave ;
	
	//~ var m2p = player.transform.position - transform.position ;
	var fwd = transform.forward ;
	var angleA = Mathf.Atan2(m2p.x, m2p.z) * Mathf.Rad2Deg;
	var angleB = Mathf.Atan2(fwd.x, fwd.z) * Mathf.Rad2Deg;
	var angleDiff = Mathf.DeltaAngle( angleA, angleB );
	
	
	rigidbody.AddRelativeTorque( Vector3.up * Mathf.Abs(Mathf.Cos(rad)) * anglerSpeed * (-angleDiff) ) ;
	
	// apply gravity
	
	
	// gounded
	isGrounded = false ;
}

function OnCollisionStay() {
	isGrounded = true ;
}

// Collision -----------------------------------------------------------------
function OnCollisionEnter(collision : Collision) {
    // check hit with Chainsaw!!
    for (var contact in collision.contacts) {
		//~ Debug.Log(contact.otherCollider.name);
        //~ Debug.DrawRay(contact.point, contact.normal, Color.red);
		if ( contact.otherCollider.name == "Chainsaw" ){
			hitWithChainsaw(1) ;
			return ;
		}
    }
    
    // Play a sound if the coliding objects had a big impact.        
    //~ if (collision.relativeVelocity.magnitude > 2)
        //~ audio.Play();
}


// Trigger ------------------------------------------------------------------
function OnTriggerEnter (other : Collider) {
    if ( other.name == "Chainsaw" ){
		hitWithChainsaw(player.rigidbody.velocity.magnitude) ;
		Debug.Log( player.rigidbody.velocity.magnitude ) ;
	}
}

function OnTriggerStay ( other : Collider ) {
	if ( other.name == "Chainsaw" ){
		hitWithChainsaw(player.rigidbody.velocity.magnitude / 3) ;
	}
}

// Damage ------------------------------------------------------------------
function hitWithChainsaw( damage : float ) {
	var amount = 0.3 ;
	
	// apply damage
	currentHealth -= damage  ;
	
	// emit particle
	particleEmitter.Emit(damage * damage / 10 + 1) ;
	
	// shake me
	rigidbody.MovePosition( rigidbody.position + Vector3( Random.value*amount-(amount/2), Random.value*amount-(amount/2), Random.value*amount-(amount/2)) ) ;
}

// Dead ------------------------------------------------------------------
function Dead() {
	Restart() ;
}


function Restart() {
	currentHealth = health ;
	transform.position =  Vector3( Random.value * 600 - 300, 3, Random.value * 600 - 300 ) ;
}