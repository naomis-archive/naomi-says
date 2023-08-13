export const Html = `
<style>
:root {
	--text: {text};
	--bg: {background};
}

body {
  width: 1300px;
	height: 500px;
	background-color: var(--bg);
	font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", "Comic Sans", cursive;
}

img {
  height: 500px;
	position: absolute;
	right: 0;
	bottom: 0;
}

div {
	position: relative;
    border: 5px solid var(--text);
	width: calc(100% - 600px);
	margin-left: 50px;
	text-align: center;
	height: 400px;
	border-radius: 10px;
	font-size: 20pt;
	display: grid;
}

p {
  margin: auto;
	color: var(--text);
}

.point{
	width: 0;
	height: 0;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-bottom: 20px solid transparent;
	border-top: 100px solid var(--text);
	position: absolute;
	right: -80px;
	top: 250px;
	transform: rotate(-90deg);
}
</style>
<body>
<div class="bubble">
	<p>Here is some text.</p>
    <div class="point"></div>
</div>
<img src="https://cdn.nhcarrigan.com/projects/naomi-says.png">
</body>`