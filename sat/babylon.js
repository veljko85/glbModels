/// <reference path='C:\Users\Veljko\Desktop\veljko\javaScript\babylonJS\babylon.d.ts' />

var canvas = document.getElementById("renderCanvas");
if (document.body.clientWidth < 768) {
    canvas.style.height = document.body.clientWidth + "px";
}
        var engine = null;
        var scene = null;
        var sceneToRender = null;
        var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createScene = function () {
            var scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

            var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
            camera.setPosition(new BABYLON.Vector3(0, 0, -1.5));
            camera.attachControl(canvas, true);
            //disable zoom
            camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius = 1.5; 
        
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        
            light.intensity = 5;
        
            var textures = [
                "bitcoin.png",
                "ethereum.png",
                "ripple.png"
        
            ];
            //make change on click outside of canvas

            let imgClass = document.getElementsByClassName('img');

            for (let i = 0; i < imgClass.length; i++) {
                imgClass[i].addEventListener("click", () =>{
                    cylinder.material.diffuseTexture = new BABYLON.Texture(textures[i]);
                })
                
            }
            //*************************************************************** */

        
        
            // this is function that is called on each cylinder pick
            var t = 0;
            var pickCylinder = function(meshEvent) {
                var pickedMesh = meshEvent.meshUnderPointer; 
                if(t < 2){t += 1}else{t=0};
                
                cylinder.material.diffuseTexture = new BABYLON.Texture(textures[t]);
                //window.open(urlList[Number(pickedMesh.name)]);
            }


            // BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Alien/", "Alien.gltf").then((result) => {   
            //     const alien = result.meshes[0];
            //     alien.scaling = new BABYLON.Vector3(2, 2, 2);
            //     alien.rotation.z = BABYLON.Tools.ToRadians(20);
            //     alien.material = new BABYLON.StandardMaterial("alienMat");
            //     //aliMat.diffuseColor = new BABYLON.Color3(0,1,0); //rgb color
            //     alien.material.diffuseTexture = new BABYLON.Texture(textures[0]); //Place the material property of the ground
            // });

            // BABYLON.SceneLoader.ImportMesh("", "https://models.babylonjs.com/", "ufo.glb", scene, function (meshes) {          
            //     scene.createDefaultCameraOrLight(true, true, true);
            //     scene.createDefaultEnvironment();
            //     const disc = result.meshes[0];
            //     disc.material.diffuseTexture = new BABYLON.Texture(textures[0]);
                
            // });

            // var cube = BABYLON.MeshBuilder.CreateBox('cube', {}, scene);
            // cube.position = new BABYLON.Vector3(-1, 0, 0);

            //create lines
            // const points = [
            //     new BABYLON.Vector3(1,0,0),
            //     new BABYLON.Vector3(1,1,1),
            //     new BABYLON.Vector3(1,1,0)
            // ];
            // const lines = BABYLON.MeshBuilder.CreateLines('lines', {
            //     points,
            // })

            // cylinder generator with actionManagers on each

            const cylMat = new BABYLON.StandardMaterial("cylMat");
                

                const faceUV2 = [];
                faceUV2[0] = new BABYLON.Vector4(0, 0.0, 1, 1);
                faceUV2[1] = new BABYLON.Vector4(0.49, 0.49, 0.5, 0.5);
                faceUV2[2] = new BABYLON.Vector4(0, 0, 1, 1);
                

                var cylinder  = BABYLON.MeshBuilder.CreateCylinder(0, {height: 0.05, tessellation: 48, faceUV: faceUV2}, scene);
                //cylinder.scaling = new BABYLON.Vector3(1, 1, 1);
                cylinder.material = cylMat;
 
                cylinder.addRotation(-1.2, 0, 0.5);
        
                //cylinder.material = new BABYLON.StandardMaterial("mat_", scene);
                cylMat.diffuseTexture = new BABYLON.Texture("bitcoin.png")
                // add actionManager on each cyl
                cylinder.actionManager = new BABYLON.ActionManager(scene);
                // register 'pickCylinder' as the handler function for cylinder picking action.
                cylinder.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, pickCylinder)
                );
        
           // } 
        
        
        
        
        return scene;
        }
                var engine;
                var scene;
                initFunction = async function() {               
                    var asyncEngineCreation = async function() {
                        try {
                        return createDefaultEngine();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngine();
                        }
                    }

                    engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        scene = createScene();};
        initFunction().then(() => {sceneToRender = scene        
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
            });
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });