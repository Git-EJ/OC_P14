const HeaderVerticalBar = () => {
  
  const multipleVerticalBars = (nbreOfBars) => {
    let verticalBars = [];
    for (let i = 0; i < nbreOfBars; i++) {
      verticalBars.push(<div className="vertical_bar" key={i}>|</div>)
    }
    return verticalBars;
  }
  
  
  return (
    <div className="vertical_bar_container">
      {multipleVerticalBars(50)}
    </div>
  )
}

export default HeaderVerticalBar;