public var spawn : Transform ;
public var zombie : Transform ;

function Start() {
	for( var i : int = 0 ; i < 30 ; i++ )
	{
		// circle spawn area
		var newPosition : Vector2 = Random.insideUnitCircle * 100;
		// create instance
		Instantiate (zombie, Vector3(newPosition.x, spawn.position.y, newPosition.y), Quaternion.identity);
		
		Debug.Log( newPosition.x +", " +  spawn.position.y + ", " + newPosition.y ) ;
	}
}


function Update () {
}