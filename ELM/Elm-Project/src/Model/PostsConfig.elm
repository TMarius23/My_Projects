module Model.PostsConfig exposing (Change(..), PostsConfig, SortBy(..), applyChanges, defaultConfig, filterPosts, sortFromString, sortOptions, sortToCompareFn, sortToString)

import Html.Attributes exposing (scope)
import Model.Post exposing (Post)
import Time


type SortBy
    = Score
    | Title
    | Posted
    | None


sortOptions : List SortBy
sortOptions =
    [ Score, Title, Posted, None ]


sortToString : SortBy -> String
sortToString sort =
    case sort of
        Score ->
            "Score"

        Title ->
            "Title"

        Posted ->
            "Posted"

        None ->
            "None"


{-|

    sortFromString "Score" --> Just Score

    sortFromString "Invalid" --> Nothing

    sortFromString "Title" --> Just Title

-}
sortFromString : String -> Maybe SortBy
sortFromString str =
    -- Nothing
    -- Debug.todo "sortFromString"
    case str of
        "Score" -> Just Score
        "Title" -> Just Title
        "Posted" -> Just Posted
        "None" -> Just None
        _ -> Nothing



sortToCompareFn : SortBy -> (Post -> Post -> Order)
sortToCompareFn sort =
    case sort of
        Score -> 
            \postA postB ->
                let 
                    cmp = compare postB.score postA.score
                in 
                    if cmp == EQ then 
                        compare (String.toLower postA.title) (String.toLower postB.title)
                    else 
                        cmp

        Title ->
            \postA postB -> compare (String.toLower postA.title) (String.toLower postB.title)

        Posted ->
            \postA postB -> compare (Time.posixToMillis postB.time) (Time.posixToMillis postA.time)

        None ->
            \_ _ -> EQ


type alias PostsConfig =
    { postsToFetch : Int
    , postsToShow : Int
    , sortBy : SortBy
    , showJobs : Bool
    , showTextOnly : Bool
    }


defaultConfig : PostsConfig
defaultConfig =
    PostsConfig 50 10 None False True


{-| A type that describes what option changed and how
-}
type Change
    = ChangePostsToShow Int
    | ChangeSortBy SortBy
    | ChangeShowJobs Bool
    | ChangeShowTextOnly Bool


{-| Given a change and the current configuration, return a new configuration with the changes applied
-}
applyChanges : Change -> PostsConfig -> PostsConfig
applyChanges change conf =
    -- Debug.todo "applyChanges"
    case change of
        ChangePostsToShow n -> {conf | postsToShow = n}
        ChangeSortBy sortBy -> {conf | sortBy = sortBy}
        ChangeShowJobs show -> {conf | showJobs = show}
        ChangeShowTextOnly show -> {conf | showTextOnly = show}


{-| Given the configuration and a list of posts, return the relevant subset of posts according to the configuration

Relevant local functions:

  - sortToCompareFn

Relevant library functions:

  - List.sortWith

-}
filterPosts : PostsConfig -> List Post -> List Post
filterPosts conf posts =
    -- []
    -- Debug.todo "filterPosts"
    posts 
        |> List.filter (
                \post -> 
                    (conf.showJobs || post.type_ /= "job") 
                    &&
                    (not conf.showTextOnly || post.url /= Nothing))
        |> List.sortWith (sortToCompareFn conf.sortBy)
        |> List.take conf.postsToShow
