import React from 'react';
import ReactPlayer from "react-player";
import Gallery from 'react-photo-gallery';
import photos from '../data/gallery_images.json';


export default function About() {
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex flex-column align-items-center justify-content-center" id="about">
                    <h1 className="mb-4">About Us</h1>
                </div>
            </div>
            
            <div className="container d-flex justify-content-center pt-3" style={{maxWidth: "1200px"}}>
                <div className="row py-5">
                    <div className="col-12 col-md-6">
                        <h1 className="display-4 mx-4">About</h1>
                        <p className="mx-4 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tempor urna. Nullam non lobortis odio. Aliquam porta vel sapien ac sodales. Quisque congue nisl varius massa eleifend, vel consequat nisi volutpat. Curabitur consequat a leo nec cursus. Quisque et quam eu mauris vulputate eleifend id in tortor. Integer egestas mauris in urna tincidunt vehicula.
                            <br></br><br></br>
                            In sed molestie sapien. In nec magna eu ipsum tempor tristique. Morbi fermentum ipsum et purus pretium sodales. Mauris eget eleifend eros. Donec convallis lorem velit, sed venenatis libero rutrum a. Nullam eget massa a purus mattis mollis venenatis ut est. Nullam aliquam maximus ornare. Praesent ex quam, luctus et mauris ac, tincidunt venenatis felis. Nam ipsum diam, consequat ultrices mi ut, rhoncus finibus felis. Praesent non tortor id ex sodales vulputate. Integer lobortis justo a varius congue. Aenean sit amet ipsum ac dolor facilisis vehicula vehicula in lectus.
                            <br></br><br></br>
                            Morbi est nisi, ultricies vel rhoncus vel, consequat non urna. Integer semper lacus ligula, sit amet malesuada mi finibus eu. Aliquam sollicitudin nec mauris nec tincidunt. Nam orci diam, fermentum eget nulla sed, vehicula finibus nunc. Donec fringilla fringilla neque, quis varius lectus sagittis ut. Etiam sed viverra diam. Sed venenatis gravida convallis. In hac habitasse platea dictumst. Suspendisse egestas mollis ante, eu vulputate ante. Maecenas vitae ipsum felis. Donec facilisis diam in eros eleifend accumsan. Phasellus eu efficitur elit, quis consectetur purus. Proin bibendum est sem, ac varius enim consequat sit amet. 
                            <br></br><br></br>
                            Ut faucibus elit vitae justo condimentum, a lobortis justo faucibus. Suspendisse lacinia mauris augue, ut malesuada dolor gravida eu. Duis accumsan dui mi. Nunc faucibus placerat.
                        </p>
                    </div>
                    <div className="col-12 col-md-6">
                        <Gallery photos={photos} />
                    </div>
                </div>
            </div>
            

            <div className="d-flex justify-content-center pb-5">
                <ReactPlayer url="https://www.youtube.com/watch?v=fBcRNs7v-rY"/>
            </div>
        </>
    )
}
