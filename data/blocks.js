export const blocks = () => [
  {
    group : 'Text' ,
    items : [
      {
        name : 'Introduction',
        image : '@/assets/blocks/' ,
        structure : [
          {
            name : 'Title' ,
            type : String,
            required : Boolean
          },

          {
            name : 'Paragraph' ,
            type : Text,
            required : Boolean
          },
          {
            name : 'Image' ,
            type : File,
            required : Boolean
          },
          
        ],
      }
    ]
  }

];
