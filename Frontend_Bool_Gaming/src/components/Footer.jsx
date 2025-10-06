const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#333",  // sfondo scuro
      color: "white",           // testo bianco
      textAlign: "center",      // testo centrato
      padding: "1rem",          // spazio interno
      marginTop: "auto"         // spinge il footer in basso se usi flex nel layout
    }}>
      <p>© {new Date().getFullYear()} - Tutti i diritti riservati</p>
    </footer>
  )
}

export default Footer
