import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const AddPostPage = ({addPostSubmit}) => {
    // const [title,setTitle] = useState('');
    // const [location,setLocation]=useState('');
    // const [googlemapsurl,setGooglemapsurl]=useState('')
    // const [startdate,setStartdate]=useState('')
    // const [enddate,setEnddate]=useState('')
    // const [description,setDescription]=useState('')
    const [post, setPost] = useState({
      title: '',
      location: '',
      googlemapsurl: '',
      startdate: '',
      enddate: '',
      description: ''
    });
    const [file,setFile]=useState(null)
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setPost(prevPost => ({
        ...prevPost,
        [name]: value
      }));
    };

  function handleFileChange(event) {
    setFile(event.target.files[0]); // Store the selected file
  }
  const navigate=useNavigate()
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file); // Add the file to the FormData
    formData.append('title', post.title);
    formData.append('location', post.location);
    formData.append('googlemapsurl', post.googlemapsurl);
    formData.append('startdate', post.startdate);
    formData.append('enddate', post.enddate);
    formData.append('description', post.description);
    console.log(formData)

    try {
      console.log(post)
      addPostSubmit(formData)
      
      return navigate('/')
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

    
    
  return (
    <div>
      <section className="bg-[#ffeded]">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Post</h2>

            
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Post Title</label
              >
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Mount Fuji"
                required
                value={post.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. JAPAN"
                required
                value={post.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Google Maps URL</label>
              <input
                type="text"
                id="googlemapsurl"
                name="googlemapsurl"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={post.googlemapsurl}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Start Date</label>
              <input
                type="date"
                id="startdate"
                name="startdate"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={post.startdate}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >End Date</label>
              <input
                type="date"
                id="enddate"
                name="enddate"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={post.enddate}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Picture</label>
              <input
                type="file"
                id="file"
                name="file"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={post.file}
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                type="text"
                id="desciption"
                name="description"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={post.description}
                onChange={handleChange}
              />
            </div>
            

            <div>
              <button
                className="bg-[#F55A5A] hover:bg-[#c92222] text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  )
}

export default AddPostPage
