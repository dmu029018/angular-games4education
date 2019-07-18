# Angular Games4education - RELEASE 1

games4education es una plataforma de juegos educativos.

Cuenta con juegos sencillos en interacción, con una curva de dificultad creciente, al principio muy ligera, pero que supone un desafío para los jugadores más hábiles.

Y ante todo, son juegos para practicar y estimular la mente.

## Estructura interna

Los módulos con los que cuenta la aplicación son los siguientes:
+ AppModule (Como toda aplicación que se precie)
+ CommonsModule (Utilidades comunes a toda la aplicación)
    + HomeComponent (actúa como landing page y como panel de usuario, en función de si existe un usuario conectado o no)
    + BrandComponent (El logo de la marca merece un diseño personalizado. En un futuro estará más animado)
    + FooterComponent (En estos momentos estorba, más que otra cosa)
    + NavbarComponent (Barra de navegación is mandatory)
    + HeaderComponent (Cabecera estándar para todos los componentes de la aplicación que merecen una página)
    + NotFoundComponent (Hecho divertido para que no sea tan fastidioso)
    + SpinnerComponent (En vías de desarrollo)
+ UsersModule (Funciones de autenticación y registro)
    + LoginComponent
    + RegisterComponent
+ GamesModule (Probablemente el módulo más importante después de Users. Tiene el control de la mayor parte de la lógica de la aplicación)
    + GameDetailsComponent (En vías de desarrollo, pero promete mucho)
    + GameListComponent (Todos los juegos a tu alcance a un solo click. Deasde aquí puedes ver detalles o ir a jugar directamente. En un futuro mostrará puntuación máxima y dispondrá de filtros)
    + GamePlay (La piedra angular de la aplicación. Sin este componente, no le interesaríamos a nadie. Aquí puedes jugar a los juegos)

Clases:
+ Game (Modela a un juego. Tiene el link para poder acceder al script, entre otros campos meramente informativos)
+ GamePlay (Contiene la información de las partidas, y de quién, cuándo y qué ha jugado. Muchos metadatos salen de aquí)
+ GameBehavior (Sin él, GamePlayComponent no molaría tanto. Loss scripts que cargan los juegos crean objetos de este tipo. Pura magia, verdad?)
+ User (Toda aplicación que se precie debe tener usuarios. Facilita mucho el logueo y registro, la verdad)
Enumeradores:  
+ Grade (La calificación de las partidas determina la curva de dificultad y también mide directamente el éxito de los jugadores)
Guardias:  
+ AuthGuard (El portero de discoteca que impide pasar a los usuarios sin usuario y los envía amablemente donde necesitan)
Servicios:  
+ ApiService (Si la información es poder, es muy, muy poderoso. Obtiene los datos de donde sea)
+ AuthService (Ayuda a los usuarios a encontrar su lugar aquí, dándoles la más cálida de las acogidas)
+ FactoryService (Forma un gran equipo con GamePlay al proveerle del GameBehavior que necesita en cada momento. Y en un futuro ampliará horizontes)
+ HashService (Nadie sabe mucho de él. Quizá es consecuencia de que sepa guardar bien los secretos)
    
    
    
 
