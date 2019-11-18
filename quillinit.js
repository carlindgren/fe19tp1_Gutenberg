const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'align': [] }],
]

var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'  // or 'bubble'
  }); 
 