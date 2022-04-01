
// shorthand for $(document).ready(handler)
$(function() {

    var $groupContainers  = $('.group-containers'),

        // out 'model': a list of objects representing user choices
        userChoices       = [];

    $('input:checkbox').on('change', function() {

        var $checkedBox     = $(this),
            checkedBoxLabel = $checkedBox.parent('label').text(),
            checkedValue    = $checkedBox.val(),
            category        = $checkedBox.data('category'),
            alreadyChecked  = !$checkedBox[0].checked;


        if(alreadyChecked){
          removeChoiceFromModel(category, checkedValue);
        } else {
          addChoiceToModel(category, checkedValue);
        }

        updateDom();

        return;
        /////////////////////////////////////////////////////////

        function cleanGroupContainers(){
          $groupContainers.each(function(){
              var list = $(this).find('ul');

              if(list.length){
                list.remove();
              }
          });
        }


        function updateDom(){

          // reset dom - not efficient but easier to
          // keep list state in sync
          cleanGroupContainers();
          appendChoices();
          hideEmptyLists();
        }

      function appendChoices(){

         var i, option, $categoryDiv,

            len = userChoices.length;

        // if len === 0 then no need to check
        if(!len) return false;

        for(i = 0; i < len; i++){
          option        = userChoices[i];
          $categoryDiv  = $('#' + option.category + '-container');

          $categoryDiv.append('<ul><li>'+option.value+'</li></ul>');
        }

      }

      function hideEmptyLists(){

        $groupContainers.each(function(){
            var $container = $(this),
                items = $container.find('ul > li');

            if(!items.length){
              $container.hide();
              // skip to next iteration
              return true;
            }

            $container.show();
        });
      }

      function addChoiceToModel(category, value){
        userChoices.push({
          category: category,
          value: checkedValue
        });
      }

      function removeChoiceFromModel(category, value){

        var i, option,

            len = userChoices.length;

        // if len === 0 then no need to check
        if(!len) return false;

        for(i = 0; i < len; i++){
          option = userChoices[i];

          if(option.category === category && option.value === value){
            // remove choice object from array
            userChoices.splice(i, 1);
            return;
          }
        }

      }

    });

});
