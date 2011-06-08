public var zombie_prefab : Transform ;

private var zombies : Array ;

function Start() {
	// load dictionary
	var d : SimpleDictionary = ScriptableObject.CreateInstance(typeof(SimpleDictionary));
	
	// get number of zombie value from dictionary
	//~ var obj = d.Get("number_of_zombie_spawn");
	//~ print ( d.Get("number_of_zombie_spawn").name.ToString );
	//~ var number_of_zombie_spawn : int = int.Parse(obj.ToString);
	var number_of_zombie_spawn : int = int.Parse("10");
	//~ print ( number_of_zombie_spawn ) ;
	// spawn zombies
	
	// initiate zombies
	for( var i : int = 0 ; i < number_of_zombie_spawn ; i++ )
	{
		// add zombie to arry
		Instantiate(zombie_prefab, Vector3.zero, Quaternion.identity);
		
		//~ zombies.Push(Instantiate(zombie_prefab, Vector3.zero, Quaternion.identity));
		// circle spawn area
	}
}


function Update () {
}

function Spawn() {
	//~ zombies.
}