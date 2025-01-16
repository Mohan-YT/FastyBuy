import React from "react";
import CategorySection from "./CategorySection";

const MainCategories = ({ allItems , search ,wishlist ,toggleWishList }) => {
      if (!allItems || allItems.length === 0) {
        return null;
      }
      
      const specialCharacters = (input)=>{
        return input    //input filter below all methods
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]/gi, "")
      }
      const ignoreCharacters = specialCharacters(search)

      // Filter function 
      const filterNeedItems = (items) => {
        return items.filter((item) => {
          const title = specialCharacters(item.title || ""); //item passed to filtering
          const description =specialCharacters(item.description || item.discription || "").toLowerCase();
          return (
            title.includes(ignoreCharacters) ||
            description.includes(ignoreCharacters)
          );
        });
      };

      //pass all allItems item to filterneeditem for match search box items
      const kids = filterNeedItems(allItems.filter((item) => item.key === "kid"));
      const womens = filterNeedItems(allItems.filter((item) => item.key === "women"));
      const mens = filterNeedItems(allItems.filter((item) => item.key === "men"));
      const homes = filterNeedItems(allItems.filter((item) => item.key === "home" || item.key === "gadget"));
      const fruits = filterNeedItems(allItems.filter((item) => item.key === "fruit"));
      const vegs = filterNeedItems(allItems.filter((item) => item.key === "veg"));

      const isEmpty = kids.length === 0 && womens.length === 0 && mens.length === 0 && homes.length === 0 && fruits.length === 0 && vegs.length === 0
      return (
        <main>
          {
            isEmpty ? (<p className="text-center fw-ligher fs-2 text-dark">No items found</p>) :(
              <>
                  <CategorySection title="Kids Fashion Dress & Toys" items={kids}
                                                                      wishlist={wishlist} 
                                                                      toggleWishList={toggleWishList} 
                                                                       />

                  <CategorySection title="Women's Fashion Dress" items={womens}
                                                                 wishlist={wishlist} 
                                                                 toggleWishList={toggleWishList} 
                                                                    />

                  <CategorySection title="Men's Fashion Dress" items={mens}
                                                               wishlist={wishlist} 
                                                               toggleWishList={toggleWishList} 
                                                                  />

                  <CategorySection title="Home Appliances & Gadgets & Mobiles" items={homes}
                                                                               wishlist={wishlist}
                                                                               toggleWishList={toggleWishList} 
                                                                                  />

                  <CategorySection title="Fresh Healthy Fruits" items={fruits}
                                                                wishlist={wishlist}
                                                                toggleWishList={toggleWishList} 
                                                                  />

                  <CategorySection title="Fresh Natural Vegetables" items={vegs}
                                                                    wishlist={wishlist}
                                                                    toggleWishList={toggleWishList} 
                                                                      />
              </>
            )
          }

        </main>
      );
};

export default MainCategories;
