package k.service.merchant;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import k.dao.DBO;

import org.json.JSONException;
import org.json.JSONObject;

import com.mysql.jdbc.Connection;

/**
 * Servlet implementation class MerDelete
 */
@WebServlet("/MerDelete")
public class MerDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MerDelete() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();//获取账号密码
		String merid=(String)request.getParameter("merid");
		System.out.println("merid:"+merid);
		String[] params = null;
		
		DBO db = new DBO();
		String sql = null ;
		int n=0;//判断是否修改成功;
		
		JSONObject json = new JSONObject();
		JSONObject js= new JSONObject();
		Boolean status = false;
		String detail = null;
		try {
			Connection conn = (Connection) db.getConn();
			if(conn!=null)
				System.out.println("conn sucess!");
			if(merid.equals("delall")){
				sql = new String("DELETE FROM merchant WHERE mercheck='false'");
				params = new String[]{};
			}else{
				sql = new String("DELETE FROM merchant WHERE merid=?");
				params = new String[]{merid};
			}
			n = db.executeUpdate(sql, params);
			if(n==0){
				System.out.println("删除失败！");
				detail = new String("删除失败！");
			}else{
				System.out.println("删除成功！");
				status = true;
				detail = new String("删除成功！");
			}
			json.put("status", status);
			json.put("detail", detail);
			json.put("message", js);
			out.println(json.toString());
			db.closeAll();
			
		}catch (ClassNotFoundException | InstantiationException|IllegalAccessException | SQLException | JSONException e) {
			 			// TODO Auto-generated catch block
			 			e.printStackTrace();	
		}
	}

}
