
function Update () {
}

function FixedUpdate () {
	rigidbody.AddForce(transform.forward * Time.deltaTime * 150);
}