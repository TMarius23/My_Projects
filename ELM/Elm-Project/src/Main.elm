module Main exposing (devFlags, init, main, prodFlags, reactorMain, update, view)

import Browser
import Dict exposing (update)
import Effect exposing (Effect, performEffect)
import Html exposing (Html, button, div, input, select, text)
import Html.Attributes exposing (href, type_)
import Model exposing (AppState(..), Config, LoadingPostsState, Mode(..), Model, Msg(..))
import Model.Post as Post
import Model.PostIds as PostIds exposing (HackerNewsItem(..))
import Model.PostsConfig
import View.Posts exposing (postTable, postsConfigView)


prodFlags : Config
prodFlags =
    { apiUrl = "https://hacker-news.firebaseio.com", mode = Prod }


devFlags : Config
devFlags =
    { apiUrl = "http://localhost:3000", mode = Dev }


{-| Create a program that uses the "production" configuration (uses the real hackernews API)
-}
main : Program () Model Msg
main =
    Browser.element
        { init = \flags -> init prodFlags flags |> Tuple.mapSecond performEffect
        , view = view
        , update = \msg model -> update msg model |> Tuple.mapSecond performEffect
        , subscriptions = subscriptions
        }


{-| Create a program that uses the development configuration (uses a local server that returns hardcoded hackernews posts)
-}
reactorMain : Program () Model Msg
reactorMain =
    Browser.element
        { init = \flags -> init devFlags flags |> Tuple.mapSecond performEffect
        , view = view
        , update = \msg model -> update msg model |> Tuple.mapSecond performEffect
        , subscriptions = subscriptions
        }


{-| Don't modify
-}
init : Config -> () -> ( Model, Effect )
init flags _ =
    ( Model.initModel flags
    , Effect.GetTime
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


getItems : String -> HackerNewsItem -> Effect
getItems apiUrl item =
    Effect.GetItems { apiUrl = apiUrl, item = item, onResult = GotPostIds, decoder = PostIds.decode }


getTopPostIds : String -> Effect
getTopPostIds apiUrl =
    getItems apiUrl Top


getPost : String -> Int -> Effect
getPost apiUrl postId =
    Effect.GetPost { apiUrl = apiUrl, postId = postId, onResult = GotPost, decoder = Post.decode }


addLoadedPost : Post.Post -> LoadingPostsState -> LoadingPostsState
addLoadedPost post state =
    { state | posts = post :: state.posts }


update : Msg -> Model -> ( Model, Effect )
update msg model =
    let
        ( newState, cmd ) =
            case ( model.state, msg ) of
                ( Model.Empty { config }, GotTime time ) ->
                    ( Model.Loading { config = config, time = time }, getTopPostIds model.config.apiUrl )

                ( Model.Loading { config, time }, GotPostIds result ) ->
                    case result of
                        Ok (Just ids) ->
                            ( Model.LoadingPosts
                                { config = config
                                , time = time
                                , postIds = ids
                                , currentId = PostIds.first ids
                                , posts = []
                                }
                            , getPost model.config.apiUrl (PostIds.first ids)
                            )

                        Ok Nothing ->
                            ( Model.Empty { config = config }, Effect.NoEffect )

                        Err err ->
                            ( Model.FailedToLoad err, Effect.NoEffect )

                ( Model.LoadingPosts loading, GotPost result ) ->
                    case result of
                        Ok post ->
                            case PostIds.advance loading.postIds of
                                Just ( nextId, nextPostIds ) ->
                                    let
                                        posts =
                                            post :: loading.posts
                                    in
                                    if List.length posts < loading.config.postsToFetch then
                                        ( Model.LoadingPosts
                                            { loading
                                                | postIds = nextPostIds
                                                , currentId = nextId
                                                , posts = posts
                                            }
                                        , getPost model.config.apiUrl nextId
                                        )

                                    else
                                        ( Model.LoadedPosts
                                            { config = loading.config
                                            , time = loading.time
                                            , posts = List.reverse (post :: loading.posts)
                                            }
                                        , Effect.NoEffect
                                        )

                                Nothing ->
                                    ( Model.LoadedPosts
                                        { config = loading.config
                                        , time = loading.time
                                        , posts = List.reverse (post :: loading.posts)
                                        }
                                    , Effect.NoEffect
                                    )

                        Err err ->
                            ( Model.FailedToLoad err, Effect.NoEffect )

                ( Model.LoadedPosts state, ConfigChanged change ) ->
                    -- ( Model.LoadedPosts state, Effect.NoEffect )
                    -- ( Debug.todo "update the config in the update function", Effect.NoEffect )
                    let
                        newConfig = Model.PostsConfig.applyChanges change state.config
                    in
                        (Model.LoadedPosts {state | config = newConfig}, Effect.NoEffect)

                ( state, _ ) ->
                    ( state, Effect.NoEffect )
    in
    ( { model | state = newState }, cmd )


view : Model -> Html Msg
view model =
    let
        title =
            if model.config.mode == Dev then
                "HackerNews (DEV)"

            else
                "HackerNews"

        body =
            case model.state of
                Model.Empty _ ->
                    div [] [ text "Loading" ]

                Model.FailedToLoad _ ->
                    div [] [ text "Failed to load" ]

                Model.LoadedPosts { config, time, posts } ->
                    div []
                        [ postsConfigView config
                        , postTable config time posts
                        ]

                Model.Loading _ ->
                    div [] [ text "Loading stories" ]

                Model.LoadingPosts { currentId } ->
                    div [] [ text <| "Loading post " ++ String.fromInt currentId ]

                _ ->
                    div [] [ text "Other" ]
    in
    div [] [ Html.h1 [] [ text title ], body ]
