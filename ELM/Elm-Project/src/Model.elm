module Model exposing
    ( AppState(..)
    , Config
    , LoadedPostsState
    , LoadingPostsState
    , LoadingState
    , Mode(..)
    , Model
    , Msg(..)
    , initModel
    )

import Cursor exposing (Cursor)
import Http
import Model.Post exposing (Post)
import Model.PostIds exposing (PostIds)
import Model.PostsConfig as PostsConfig exposing (PostsConfig, defaultConfig)
import Time


type Msg
    = GotTime Time.Posix
    | GotPostIds (Result Http.Error (Maybe PostIds))
    | GotPost (Result Http.Error Post)
    | ConfigChanged PostsConfig.Change


type alias LoadingState =
    { config : PostsConfig, time : Time.Posix }


type alias LoadingPostsState =
    { config : PostsConfig, time : Time.Posix, postIds : PostIds, currentId : Int, posts : List Post }


type alias LoadedPostsState =
    { config : PostsConfig, time : Time.Posix, posts : List Post }


type AppState
    = Empty { config : PostsConfig }
    | Loading LoadingState
    | LoadingPosts LoadingPostsState
    | LoadedPosts LoadedPostsState
    | FailedToLoad Http.Error
    | OtherError String


type alias Model =
    { config : Config
    , state : AppState
    }


type Mode
    = Dev
    | Prod


type alias Config =
    { apiUrl : String
    , mode : Mode
    }


initModel : Config -> Model
initModel config =
    { config = config, state = Empty { config = defaultConfig } }
