var quill = new Quill('#editor', {
    modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }]
        ]
      },
      /* placeholder: 'Compose an epic...', */
      theme: 'snow'  // or 'bubble'
  });   


  //använda detta?
 
