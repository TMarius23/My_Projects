module View.Posts exposing (..)

import Html exposing (Html, div, text)
import Html.Attributes exposing (href)
import Html.Events
import Model exposing (Msg(..))
import Model.Post exposing (Post)
import Model.PostsConfig exposing (Change(..), PostsConfig, SortBy(..), filterPosts, sortFromString, sortOptions, sortToCompareFn, sortToString)
import Time
import Util.Time


{-| Show posts as a HTML [table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)

Relevant local functions:

  - Util.Time.formatDate
  - Util.Time.formatTime
  - Util.Time.formatDuration (once implemented)
  - Util.Time.durationBetween (once implemented)

Relevant library functions:

  - [Html.table](https://package.elm-lang.org/packages/elm/html/latest/Html#table)
  - [Html.tr](https://package.elm-lang.org/packages/elm/html/latest/Html#tr)
  - [Html.th](https://package.elm-lang.org/packages/elm/html/latest/Html#th)
  - [Html.td](https://package.elm-lang.org/packages/elm/html/latest/Html#td)

-}

postareLinii : Time.Posix -> Post -> Html Msg
postareLinii time post =
     Html.tr [Html.Attributes.style "border-collapse" "collapse", Html.Attributes.style "width" "100%"]
        [ Html.td [Html.Attributes.class "post-score", Html.Attributes.style "padding" "8px", Html.Attributes.style "text-align" "left"] [ Html.text (String.fromInt post.score) ]
        , Html.td [Html.Attributes.class "post-title", Html.Attributes.style "padding" "8px", Html.Attributes.style "text-align" "left"] [ Html.text  post.title]
        , Html.td [Html.Attributes.class "post-type", Html.Attributes.style "padding" "8px", Html.Attributes.style "text-align" "left"] [ Html.text post.type_]
        , Html.td [Html.Attributes.class "post-time", Html.Attributes.style "padding" "8px", Html.Attributes.style "text-align" "left"
                  , Html.Attributes.title (Util.Time.formatTime Time.utc post.time)] 
                    [ Html.text 
                      (
                        let
                          dateStr = Util.Time.formatTime Time.utc post.time
                          relStr = 
                            case Util.Time.durationBetween post.time time of
                                Just dur -> " (" ++ Util.Time.formatDuration dur ++ ")"
                                Nothing -> ""
                        in
                          dateStr ++ relStr
                      )
                    ]

        , Html.td [Html.Attributes.class "post-url"] [ Html.a [href (Maybe.withDefault "" post.url)] [Html.text "Open"]]
        ]
    

postTable : PostsConfig -> Time.Posix -> List Post -> Html Msg
postTable postConf time listPost =
    -- div [] []
    -- Debug.todo "postTable"
    div [Html.Attributes.style "margin-top" "20px"]
        [ Html.table []
           (
            Html.tr []
                [ Html.th [] [ Html.text "Score" ]
                , Html.th [] [ Html.text "Title" ]
                , Html.th [] [ Html.text "Type" ]
                , Html.th [] [ Html.text "Posted date" ]
                , Html.th [] [ Html.text "Link" ]
                ]
            
            :: (List.map (postareLinii time) (filterPosts postConf listPost))
           )
        ]
    

{-| Show the configuration options for the posts table

Relevant functions:

  - [Html.select](https://package.elm-lang.org/packages/elm/html/latest/Html#select)
  - [Html.option](https://package.elm-lang.org/packages/elm/html/latest/Html#option)
  - [Html.input](https://package.elm-lang.org/packages/elm/html/latest/Html#input)
  - [Html.Attributes.type\_](https://package.elm-lang.org/packages/elm/html/latest/Html-Attributes#type_)
  - [Html.Attributes.checked](https://package.elm-lang.org/packages/elm/html/latest/Html-Attributes#checked)
  - [Html.Attributes.selected](https://package.elm-lang.org/packages/elm/html/latest/Html-Attributes#selected)
  - [Html.Events.onCheck](https://package.elm-lang.org/packages/elm/html/latest/Html-Events#onCheck)
  - [Html.Events.onInput](https://package.elm-lang.org/packages/elm/html/latest/Html-Events#onInput)

-}
postsConfigView : PostsConfig -> Html Msg
postsConfigView conf =
    -- div [] []
    -- Debug.todo "postsConfigView"
    div [Html.Attributes.style "border" "1px solid #ddd", Html.Attributes.style "padding" "15px", Html.Attributes.style "border-radius" "5px", Html.Attributes.style "background-color" "#f9f9f9"]
    [
        Html.select 
          [Html.Attributes.id "select-posts-per-page"
          , Html.Attributes.style "margin-bottom" "15px"
          , Html.Events.onInput 
                (\val ->
                    val
                        |> String.toInt
                        |> Maybe.withDefault conf.postsToShow
                        |> ChangePostsToShow
                        |> ConfigChanged
                )      
          ]

          [ Html.option [ Html.Attributes.value "10", Html.Attributes.selected (conf.postsToShow == 10) ] [ text "10" ]
          , Html.option [ Html.Attributes.value "25", Html.Attributes.selected (conf.postsToShow == 25) ] [ text "25" ]
          , Html.option [ Html.Attributes.value "50", Html.Attributes.selected (conf.postsToShow == 50) ] [ text "50" ]
          ]
      

      , Html.select
        [Html.Attributes.id "select-sort-by"
        , Html.Events.onInput 
            (\val ->
                case sortFromString val of
                    Just s -> ChangeSortBy s |> ConfigChanged
                    Nothing ->ChangeSortBy conf.sortBy |> ConfigChanged
            )
        ]
        (List.map
            (\sortare ->
                Html.option
                    [ Html.Attributes.value (sortToString sortare)
                    , Html.Attributes.selected (sortare == conf.sortBy)
                    ]
                    [ text (sortToString sortare) ]
            )
            sortOptions
        )
      
      , div [Html.Attributes.style "padding-top" "10px", Html.Attributes.style "border-top" "1px solid #eee"] 
        [
          Html.label [ Html.Attributes.for "checkbox-show-job-posts" ]
            [ Html.text "Show job posts" ]

          , Html.label [] 
            [
              Html.input
              [Html.Attributes.id "checkbox-show-job-posts"
              , Html.Attributes.type_ "checkbox"
              , Html.Attributes.checked conf.showJobs
              , Html.Events.onCheck (\che -> ChangeShowJobs che |> ConfigChanged)
              ]
              []
            ] 
        ]
      
      , div [Html.Attributes.style "padding-top" "10px", Html.Attributes.style "border-top" "1px solid #eee"] 
      [
        Html.label [ Html.Attributes.for "checkbox-show-text-only-posts" ]
          [ Html.text "Show text only posts" ]

        , Html.label [] 
          [Html.input
            [Html.Attributes.id "checkbox-show-text-only-posts"
            , Html.Attributes.type_ "checkbox"
            , Html.Attributes.checked conf.showTextOnly
            , Html.Events.onCheck (\che -> ChangeShowTextOnly che |> ConfigChanged)
            ]
            [] 
          ]
      ]
    ]
