
        function allowDrop(ev) {
            ev.preventDefault();
        }
        
        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.parentElement.id);
        }
        
        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var target = ev.target.parentElement;
            var targetImg = target.getElementsByTagName("img")[0];
            var source = document.getElementById(data);
            var sourceImg = source.getElementsByTagName("img")[0];
            target.appendChild(sourceImg);
            source.appendChild(targetImg);
        }
