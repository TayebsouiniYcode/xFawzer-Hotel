/**
 * Fait défiler la page vers l'élément cible avec un effet de défilement fluide
 * @param targetId - L'ID de l'élément cible (sans le #)
 * @param offset - Décalage en pixels depuis le haut de la page (pour prendre en compte les en-têtes fixes)
 */
export const scrollToElement = (targetId: string, offset: number = 80): void => {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };
  
  /**
   * Initialise les gestionnaires d'événements pour les liens d'ancrage
   * @param offset - Décalage en pixels depuis le haut de la page
   */
  export const initSmoothScrolling = (offset: number = 80): void => {
    document.addEventListener('DOMContentLoaded', () => {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      
      anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href')?.substring(1);
          
          if (targetId) {
            scrollToElement(targetId, offset);
          }
        });
      });
    });
  };
  
  /**
   * Hook personnalisé pour utiliser le défilement fluide dans les composants React
   * @param targetId - L'ID de l'élément cible (sans le #)
   * @param offset - Décalage en pixels depuis le haut de la page
   */
  export const useScrollTo = (targetId: string, offset: number = 80): () => void => {
    return () => scrollToElement(targetId, offset);
  };