import './ReferralLinks.css'
function ReferralLinks({setShowReferral, setCategory}) {

    function setReferral() {
        setShowReferral(false)
    }

    function resetCategory() {
        setCategory("")
    }

    return(
        <footer>
            <p>© 2023 <a href="https://www.linkedin.com/in/denisa-gi%C5%88ov%C3%A1-035053110/" target="_blank">Denisa Giňová</a></p>
            <a id="home-link" href="#logo" onClick={resetCategory}>Home</a>
            <p>Made with ❤ by <a href="#" onClick={setReferral}>Václav Vlček</a></p>
        </footer>
    )
}
export default ReferralLinks