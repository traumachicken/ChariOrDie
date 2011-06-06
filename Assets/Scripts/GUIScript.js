public var map : Texture2D ;
public var dot : Texture2D ;

private var p : Vector3 ;

function Start () {
	
}

function OnGUI () {
	p = GameObject.FindWithTag("Player").transform.position ;
	
	GUI.Box (Rect (0,0,110,130), "Unknown City");
	GUI.DrawTexture(Rect(10,30,90,90), map, ScaleMode.ScaleToFit, true, 0);
	
	var dotx = Mathf.Abs(p.x) / 600 * 90 ;
	var doty = Mathf.Abs(p.z) / 600 * 90 ;
	
	GUI.DrawTexture(Rect( dotx + 10, 120 - doty , 3, 3), dot, ScaleMode.ScaleToFit, true, 0);
}