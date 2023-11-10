import './PageInfo.css'

function PageInfo() {

    return (
        <div id="info-info">
            <p>About the author</p>
            <p className="heading">Hello,</p>
            <p className="text">
                I am [your name] and I am a web developer.
            </p>
            <p className="heading">I created this website for my girlfriend, where she can store and manage her
                portfolio.</p>
            <p className="text">
                The app is built on React and Node.js and includes a robust site management system that allows users to
                add images, respond to comments, change profile pictures, site backgrounds, add new images to
                categories, and create new categories.
            </p>
            <p className="heading">All of these features are accessible through an intuitive interface that requires no
                programming knowledge.</p>
            <p className="text">
                This is my first web app, and I am proud of it. I am excited to be able to present it.
            </p>
            <p className="heading">If you are interested in collaborating or seeing other projects I have worked on,
                please feel free to contact me.</p>
            <p className="text">
                Sincerely,
                [Your name]
            </p>
        </div>
    )
}

export default PageInfo