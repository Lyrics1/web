window.onload=function(){
	<script type="text/javascript">
	function b(){
		var name=document.getElementById("blog").getElementsByTagName("div");
			for(var i=0;i<name.length;i++){
			name[i].style.background="#EC1515";
		}
	}
	function reveal(){
		var name=document.getElementById("blog").getElementsByTagName("div");
		for(var i=0;i<name.length;i++){
		name[i].removeAttribute("style");
	}}
	</script>
}