var other : GUIScript;

function Start () {
    // Find the OtherScript which is attached to any game object in the scene.
    other = FindObjectOfType(GUIScript);
}
function Update() {
    transform.Rotate(0, other.speed, 0);
    transform.Translate(other.speed, 0, 0);
}