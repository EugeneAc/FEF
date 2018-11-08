        
        function drop(ev) {
            ev.preventDefault();
            var data = ev.originalEvent.dataTransfer.getData("text");
            var target = ev.target.parentElement;
            var targetImg = target.getElementsByTagName("img")[0];
            var source = document.getElementById(data);
            var sourceImg = source.getElementsByTagName("img")[0];
            target.appendChild(sourceImg);
            source.appendChild(targetImg);
        }

        $(".gallery-flex-item").on('dragover', function(ev){
            ev.preventDefault();
        })
        .on('dragstart', function(ev){
            ev.originalEvent.dataTransfer.setData("text", ev.target.parentElement.id);
        })
        .on ('drop', function(ev){
            drop(ev);
        });