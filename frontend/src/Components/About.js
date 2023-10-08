import React from "react";
import styles from "./About.module.css"
import Header from "./Header";
import Footer from "./Footer";
export default function About() {
  return (
    <>
    
    <Header/>
    <div className={styles.aboutcontainer}>
      <center>
        {" "}
        <h1> Qui sommes nous ?</h1>
      </center>
      <table className={styles.tableabout}>
        <tr>
          <td>
            {" "}
            <p>
              {" "}
              <h3>
                Évitez les files d'attente <br></br>avec Bio 4 Saison
              </h3>
              Vous n'avez plus besoin de faire la queue en épicerie pour vos
              légumes frais. Vous pouvez simplement commander en ligne et nous
              livrons vos produits directement chez vous.
            </p>{" "}
          </td>
          <td>
            <img src="/images/empty_cart.png"></img>{" "}
          </td>
        </tr>
        <tr>
          <td>
            <img src="/images/generate-your-shipping-tracking-number-international-shipping-partners-1024x576.png"></img>{" "}
          </td>
          <td>
            <h3>
              Livraison rapide et fiable <br></br> avec Bio 4 Saison
            </h3>
            <p>
              Nous comprenons que vous êtes occupé et que vous n'avez pas
              toujours le temps de faire les courses. C'est pourquoi nous avons
              mis en place un système de livraison pratique et rapide pour que
              vous puissiez recevoir vos légumes frais directement à votre
              porte.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            {" "}
            <h3>
              Restez en sécurité avec Bio 4 Saison <br></br> Faites vos courses
              en ligne
            </h3>
            <p>
              {" "}
              Nous comprenons l'importance de rester en sécurité, surtout
              pendant les périodes de pandémie. C'est pourquoi nous prenons
              toutes les mesures nécessaires pour assurer la sécurité de nos
              produits et de nos clients. Vous pouvez être sûr que lorsque vous
              achetez chez Bio 4 Season, vous êtes en de bonnes mains.
            </p>
          </td>
          <td>
            <img src="/images/coronavirus-update-stay-home-1038x888.png"></img>{" "}
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button
              Produitstype="submit"
              className={styles.commanderbutton}
              style={{ display: "block", margin: "0 auto" }}
            >
              {" "}
              <b>Commencer à magasiner →</b>
            </button>
          </td>
        </tr>
      </table>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>   <Footer/> </>
  );
}
